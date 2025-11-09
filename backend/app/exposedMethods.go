package app

import (
	"go-by-the-roads/backend/roadmaps"
	"go-by-the-roads/backend/settings"
	"go-by-the-roads/backend/utils"
	"go-by-the-roads/backend/version"
	"log"
	"path/filepath"
)

// GetAvailableRoadmaps returns all the available roadmaps scanned previously by the RoadmapLoader (returns a list of folder name)
func (a *App) GetAvailableRoadmaps() []string {
	return roadmaps.RoadmapLoader.ScannedFolders
}

// SelectRoadmap loads a given roadmap into the RoadmapLoader
func (a *App) SelectRoadmap(s string) {
	roadmaps.RoadmapLoader.Load(s)
}

// GetRoadmapTitle returns roadmap's title
func (a *App) GetRoadmapTitle() string {
	return roadmaps.RoadmapLoader.Content.Title
}

// GetRoadmapSites returns roadmap's content (slice of Site)
func (a *App) GetRoadmapSites() roadmaps.SiteSlice {
	return roadmaps.RoadmapLoader.Content.Elements
}

// GetPreferences returns the current user's preferences
func (a *App) GetPreferences() settings.Settings {
	return settings.Preferences
}

// GetMapLoader returns the current MapLoader (it is only used to export the roadmaps.MapLoader type into React)
func (a *App) GetMapLoader() roadmaps.MapLoader {
	return roadmaps.RoadmapLoader
}

// LogNavigation logs each page explored by the user
func (a *App) LogNavigation(s string) {
	log.Printf(utils.INFO_STR+"[NAVIGATION] navigating to \"%s\"", s)
}

// Version returns all the useful informations concerning versionning of this software
func (a *App) Version() []interface{} {
	var latestReleaseTag string = version.GetLatestReleaseTag()
	if latestReleaseTag == "" {
		latestReleaseTag = "?"
	}
	return []interface{}{version.IsLatestVersion(), version.CurrentTag, latestReleaseTag, version.RepoLink, version.RepoOwner}
}

// OpenLink opens the given `url` into user's default browser
func (a *App) OpenLink(url string) {
	utils.OpenURL(url)
}

// OpenRepoLink opens the Github repository's link into user's default browser
func (a *App) OpenRepoLink() {
	utils.OpenURL(version.RepoLink)
}

// SwitchCompletedState turns Site.Completed into his logical opposite
//
// It modifies the Site list using site.Id, so it is a constant complexity
func (a *App) SwitchCompletedState(site roadmaps.Site) {
	if site.Id < uint(len(roadmaps.RoadmapLoader.Content.Elements)) {
		roadmaps.RoadmapLoader.Content.Elements[site.Id].SwitchCompletedState()
	}
}

// SaveRoadmap export current Roadmap's data to its folder (to the disk)
func (a *App) SaveRoadmap() {
	roadmaps.RoadmapLoader.Save(false)
}

// SaveSettings export current user's preferences to the disk
func (a *App) SaveSettings() {
	settings.Preferences.Save()
}

// NewRoadmap creates a new Roadmap and saves it in the Preferences.RoadmapsPath folder
//
// Because the boolean passed as param into roadmaps.RoadmapLoader.Save() is `true`,
// the newly created folder will take an integer suffix if another folder with the same name exists. Example:
//
// {"New Roadmap"} -> NewRoadmap() -> {"New Roadmap", "New Roadmap 1"}
func (a *App) NewRoadmap() {
	roadmaps.RoadmapLoader.Content = roadmaps.NewMap()
	roadmaps.RoadmapLoader.Save(true)
	roadmaps.RoadmapLoader.Scan()
}

// DeleteRoadmap removes a roadmap with the name `s` by deleting its folder (moving it to the trashbin)
func (a *App) DeleteRoadmap(s string) {
	log.Printf(utils.INFO_STR+"[DeleteRoadmap] removing \"%s\"", s)
	utils.DeleteFolder(filepath.Join(settings.Preferences.RoadmapsPath, s))
	roadmaps.RoadmapLoader.Scan()
}

// DeleteSite removes a `site` from the SiteCard list
func (a *App) DeleteSite(site roadmaps.Site) {
	roadmaps.RoadmapLoader.Content.Elements.Remove(site)
	roadmaps.RoadmapLoader.Save(false)
}

// AddNewSite inserts a new site (see also roadmaps.NewSiteFromMap) at `index` in the SiteCard list
func (a *App) AddNewSite(index uint) {
	var newSite roadmaps.Site = roadmaps.NewSiteFromMap(roadmaps.RoadmapLoader.Content)
	newSite.Id = index
	roadmaps.RoadmapLoader.Content.Elements.Insert(newSite)
	roadmaps.RoadmapLoader.Save(false)
}

// MoveUpSite moves a Site from the roadmap upwards in the list
func (a *App) MoveUpSite(site roadmaps.Site) {
	if len(roadmaps.RoadmapLoader.Content.Elements) > 1 {
		if site.Id > 0 {
			roadmaps.RoadmapLoader.Content.Elements.Remove(site)
			site.Id--
			roadmaps.RoadmapLoader.Content.Elements.Insert(site)
		}
	}
}

// MoveDownSite moves a Site from the roadmap downwards in the list
func (a *App) MoveDownSite(site roadmaps.Site) {
	if len(roadmaps.RoadmapLoader.Content.Elements) > 1 {
		if site.Id < uint(len(roadmaps.RoadmapLoader.Content.Elements)-1) {
			roadmaps.RoadmapLoader.Content.Elements.Remove(site)
			site.Id--
			roadmaps.RoadmapLoader.Content.Elements.Insert(site)
		}
	}
}

// RenameRoadmap renames a folder from the Preferences.RoadmapsPath from `old` to `new` directly on the file system (because each folder is a roadmap basically)
func (a *App) RenameRoadmap(old, new string) {
	utils.RenameChildFolderUsingParent(settings.Preferences.RoadmapsPath, old, new)
	roadmaps.RoadmapLoader.Scan()
}

// ModifySiteByID sets a given `attribute` from a Site where its ID is equal to `siteID` into a given `value`
//
// Complexity: Bigger the SiteCard list is, longer this function will take
//
// If the `attribute` is unknown, it does not do anything
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

// ModifyPreferences sets a given `attribute` from user's preferences into a given `value`
//
// If the `attribute` is unknown, it does not do anything
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

// ResetPreference resets a given `attribute` from user's preferences into its default state (see also settings.Settings type)
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
