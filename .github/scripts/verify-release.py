#!/usr/bin/env python3
"""Fail-closed release gate: main commits must come from a merged PR with passing checks."""
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request


def fail(message):
    print("RELEASE BLOCKED:", message, file=sys.stderr)
    sys.exit(1)


def github_api(path):
    request = urllib.request.Request(
        "https://api.github.com" + path,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer " + os.environ["GH_TOKEN"],
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "agencia-web-release-gate",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            return json.load(response)
    except (urllib.error.HTTPError, urllib.error.URLError, ValueError) as error:
        fail("GitHub API could not be verified: " + str(error))


repo = os.environ["GITHUB_REPOSITORY"]
sha = os.environ["GITHUB_SHA"]
expected = [entry.strip() for entry in os.environ["EXPECTED_WORKFLOWS"].split(",") if entry.strip()]
if os.environ.get("GITHUB_REF") != "refs/heads/main":
    fail("This gate only permits the main branch")
if not expected:
    fail("No required PR workflows configured")

associated_prs = github_api("/repos/" + repo + "/commits/" + sha + "/pulls?per_page=100")
approved_prs = [
    pr for pr in associated_prs
    if pr.get("merged_at")
    and pr.get("base", {}).get("ref") == "main"
    and pr.get("merge_commit_sha") == sha
]
if not approved_prs:
    fail("Commit is not the merge result of a pull request into main")

pr = approved_prs[0]
head_sha = pr["head"]["sha"]
query = urllib.parse.urlencode({"head_sha": head_sha, "event": "pull_request", "per_page": "100"})
results = github_api("/repos/" + repo + "/actions/runs?" + query)
runs = results.get("workflow_runs", [])
for workflow_path in expected:
    matching = [
        run for run in runs
        if run.get("path") == workflow_path
        and run.get("head_sha") == head_sha
        and run.get("event") == "pull_request"
    ]
    if not matching:
        fail("No PR test run for " + workflow_path)
    latest = max(matching, key=lambda run: (run.get("updated_at", ""), run.get("run_attempt", 0)))
    if latest.get("status") != "completed" or latest.get("conclusion") != "success":
        fail(workflow_path + " was not successful (latest: " + str(latest.get("conclusion")) + ")")
    print("PASSED", workflow_path, "run", latest["id"])

print("RELEASE APPROVED: PR #" + str(pr["number"]) + " had all required checks.")
