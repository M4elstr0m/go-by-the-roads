package app

import (
	"go-by-the-roads/backend/roadmaps"
	"go-by-the-roads/backend/settings"
	"go-by-the-roads/backend/utils"
	"go-by-the-roads/backend/version"
	"log"
	"path/filepath"
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

func (a *App) SwitchCompletedState(site roadmaps.Site) {
	if site.Id < uint(len(roadmaps.RoadmapLoader.Content.Elements)) {
		roadmaps.RoadmapLoader.Content.Elements[site.Id].SwitchCompletedState()
	}
}

func (a *App) SaveRoadmap() {
	roadmaps.RoadmapLoader.Save(false)
}

func (a *App) SaveSettings() {
	settings.Preferences.Save()
}

func (a *App) NewRoadmap() {
	roadmaps.RoadmapLoader.Content = roadmaps.NewMap()
	roadmaps.RoadmapLoader.Save(true)
	roadmaps.RoadmapLoader.Scan()
}

func (a *App) DeleteRoadmap(s string) {
	log.Printf(utils.INFO_STR+"[DeleteRoadmap] removing \"%s\"", s)
	utils.DeleteFolder(filepath.Join(settings.Preferences.RoadmapsPath, s))
	roadmaps.RoadmapLoader.Scan()
}

func (a *App) DeleteSite(site roadmaps.Site) {
	roadmaps.RoadmapLoader.Content.Elements.Remove(site)
	roadmaps.RoadmapLoader.Save(false)
}

func (a *App) AddNewSite(index uint) {
	var newSite roadmaps.Site = roadmaps.NewSiteFromMap(roadmaps.RoadmapLoader.Content)
	newSite.Id = index
	roadmaps.RoadmapLoader.Content.Elements.Insert(newSite)
	roadmaps.RoadmapLoader.Save(false)
}

func (a *App) MoveUpSite(site roadmaps.Site) {
	if len(roadmaps.RoadmapLoader.Content.Elements) > 1 {
		if site.Id > 0 {
			roadmaps.RoadmapLoader.Content.Elements.Remove(site)
			site.Id--
			roadmaps.RoadmapLoader.Content.Elements.Insert(site)
		}
	}
}

func (a *App) MoveDownSite(site roadmaps.Site) {
	if len(roadmaps.RoadmapLoader.Content.Elements) > 1 {
		if site.Id < uint(len(roadmaps.RoadmapLoader.Content.Elements)-1) {
			roadmaps.RoadmapLoader.Content.Elements.Remove(site)
			site.Id--
			roadmaps.RoadmapLoader.Content.Elements.Insert(site)
		}
	}
}
