// roadmaps is an internal package containing all the tools to build a project roadmap
package roadmaps

import (
	"go-by-the-roads/backend/utils"
	"log"
	"slices"
)

// What would be the use of a map if there was no interesting sites to visit?
//
// Structure corresponding to a task the user wants to achieve
type Site struct {
	// Identifier of a Site
	//
	// Each Id must be unique within a slice of Site
	//
	// The lower the Id is, the sooner the task should be completed
	id uint

	Title       string `json:"title"`   // Title of a Site (will be written in bold)
	Description string `json:"desc"`    // Short description of a Site (will be written in regular)
	Content     string `json:"content"` // Content of a Site (will be shown on hover)

	Completed bool `json:"completed"` // Indicator of completion
}

// Returns a new Site instance depending on a Map
func NewSiteFromMap(m Map) Site {
	return Site{
		id: uint(len(m.Elements)),

		Title:       "New Site",
		Description: "",
		Content:     "",

		Completed: false,
	}
}

// Slice of Site type
type SiteSlice []Site

// Insert a Site {s} at its right index in the SiteSlice {ss}
//
// If it replaces another Site, all Site.Id values from ss[s.Id+1:] are incremented by 1 (Site.Id++)
func (ss *SiteSlice) Insert(s Site) {
	var l uint = uint(len(*ss))

	if s.id > l {
		s.id = l
	}

	*ss = slices.Insert(*ss, int(s.id), s)

	for i := s.id + 1; i < l+1; i++ {
		(*ss)[i].id++
	}

}

// Remove deletes a Site {s} from the SiteSlice {ss} and adjusts all Site.Id
func (ss *SiteSlice) Remove(s Site) {
	var l uint = uint(len(*ss))

	if s.id >= l {
		log.Println(utils.WARNING_STR + "[SiteSlice.Remove] aborted: [s.id >= l]")
		return
	}

	*ss = slices.Delete(*ss, int(s.id), int(s.id)+1)

	for i := s.id; i < l-1; i++ {
		(*ss)[i].id--
	}
}
