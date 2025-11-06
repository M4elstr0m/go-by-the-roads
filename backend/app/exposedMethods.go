package app

import (
	"go-by-the-roads/backend/roadmaps"
	"go-by-the-roads/backend/utils"
	"go-by-the-roads/backend/version"
	"log"
)

func (a *App) GetAvailableRoadmaps() []string {
	return roadmaps.RoadmapLoader.ScannedFolders
}

func (a *App) SelectRoadmap(s string) {
	roadmaps.RoadmapLoader.Load(s)
}

func (a *App) GetRoadmapTitle() string {
	return roadmaps.RoadmapLoader.Content.Title
}

func (a *App) GetRoadmapSites() roadmaps.SiteSlice {
	return roadmaps.RoadmapLoader.Content.Elements
}

func (a *App) GetMapLoader() roadmaps.MapLoader {
	return roadmaps.RoadmapLoader
}

func (a *App) LogNavigation(s string) {
	log.Printf(utils.INFO_STR+"[NAVIGATION] navigating to \"%s\"", s)
}

func (a *App) Version() []interface{} {
	var latestReleaseTag string = version.GetLatestReleaseTag()
	if latestReleaseTag == "" {
		latestReleaseTag = "?"
	}
	return []interface{}{version.IsLatestVersion(), version.CurrentTag, latestReleaseTag, version.RepoLink, version.RepoOwner}
}

func (a *App) OpenLink(url string) {
	utils.OpenURL(url)
}

func (a *App) OpenRepoLink() {
	utils.OpenURL(version.RepoLink)
}
