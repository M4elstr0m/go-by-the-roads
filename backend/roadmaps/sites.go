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

	title       string // Title of a Site (will be written in bold)
	description string // Short description of a Site (will be written in regular)
	content     string // Content of a Site (will be shown on hover)

	completed bool // Indicator of completion
}

// Returns a new Site instance depending on a Map
func NewSiteFromMap(m Map) Site {
	return Site{
		id: uint(len(m.elements)),

		title:       "New Site",
		description: "",
		content:     "",

		completed: false,
	}
}

// Slice of Site type
type SiteSlice []Site

// Insert s at its right index in ss
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

func (ss *SiteSlice) Remove(s Site) {
	var l uint = uint(len(*ss))

	if s.id >= l {
		log.Println(utils.WARNING_STR + " [SiteSlice.Remove] aborted")
		return
	}

	*ss = slices.Delete(*ss, int(s.id), int(s.id)+1)

	for i := s.id; i < l-1; i++ {
		(*ss)[i].id--
	}
}

// Add / Delete
// Display in React
