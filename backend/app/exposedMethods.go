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

func (a *App) GetPreferences() settings.Settings {
	return settings.Preferences
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

func (a *App) RenameRoadmap(old, new string) {
	utils.RenameChildFolderUsingParent(settings.Preferences.RoadmapsPath, old, new)
	roadmaps.RoadmapLoader.Scan()
}

func (a *App) ModifySiteByID(siteID uint, attribute, value string) {
	for i := range roadmaps.RoadmapLoader.Content.Elements {
		if roadmaps.RoadmapLoader.Content.Elements[i].Id == siteID {
			switch attribute {
			case "title":
				roadmaps.RoadmapLoader.Content.Elements[i].Title = value
			case "description", "desc":
				roadmaps.RoadmapLoader.Content.Elements[i].Description = value
			case "content":
				roadmaps.RoadmapLoader.Content.Elements[i].Content = value
			default:
				log.Printf(utils.WARNING_STR+"[ModifySiteByID] Unknown attribute hardcoded in source code: \"%s\"", attribute)
			}
			return
		}
	}
	log.Printf(utils.WARNING_STR+"[ModifySiteByID] call did not changed anything ModifySiteByID(%v, %v, %v)", siteID, attribute, value)
}

func (a *App) ModifyPreferences(attribute string, value interface{}) {
	switch attribute {
	case "roadmapsPath":
		settings.Preferences.RoadmapsPath = value.(string)
		roadmaps.RoadmapLoader.Scan()
	case "windowWidth":
		settings.Preferences.WindowWidth = int(value.(float64))
	case "windowHeight":
		settings.Preferences.WindowHeight = int(value.(float64))
	default:
		log.Printf(utils.WARNING_STR+"[ModifyPreferences] Unknown attribute hardcoded in source code: \"%s\"", attribute)
		//log.Printf(utils.WARNING_STR+"[ModifyPreferences] call did not changed anything ModifyPreferences(%v, %v)", attribute, value)
	}

}

func (a *App) ResetPreference(attribute string) {
	var defaultPrefs settings.Settings = settings.GetDefaultSettings()
	switch attribute {
	case "roadmapsPath":
		settings.Preferences.RoadmapsPath = defaultPrefs.RoadmapsPath
	case "windowWidth":
		settings.Preferences.WindowWidth = defaultPrefs.WindowWidth
	case "windowHeight":
		settings.Preferences.WindowHeight = defaultPrefs.WindowHeight
	default:
		log.Printf(utils.WARNING_STR+"[ResetPreference] Unknown attribute hardcoded in source code: \"%s\"", attribute)
	}
}
