package version

import (
	"encoding/json"
	"fmt"
	"go-by-the-roads/backend/utils"
	"log"
	"net/http"
)

// Not very secure

const CurrentTag string = "v1.0.0"
const RepoOwner string = "M4elstr0m"
const RepoName string = "Go by the Roads"
const RepoNameStrict string = "go-by-the-roads"
const RepoLink string = "https://github.com/M4elstr0m/go-by-the-roads"

// Type used to parse version json
type githubRelease struct {
	TagName string `json:"tag_name"`
}

// GetLatestReleaseTag returns the latest release tag from Github (eg. v2.0.1)
func GetLatestReleaseTag() string {
	var err error = nil
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases/latest", RepoOwner, RepoNameStrict)

	resp, err := http.Get(url)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[version.GetLatestReleaseTag] %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf(utils.WARNING_STR+"[version.GetLatestReleaseTag] GitHub API returned %d", resp.StatusCode)
	}

	var release githubRelease
	err = json.NewDecoder(resp.Body).Decode(&release)
	if err != nil {
		log.Printf(utils.WARNING_STR+"[version.GetLatestReleaseTag] %v", err)
	}

	return release.TagName
}

// IsLatestVersion returns whether current version is the latest available
func IsLatestVersion() bool {
	var latestTag string = GetLatestReleaseTag()
	return CurrentTag == latestTag
}
