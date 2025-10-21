package roadmaps

import (
	"go-by-the-roads/backend/settings"
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
	Id uint

	Title       string // Title of a Site (will be written in bold)
	Description string // Short description of a Site (will be written in regular)
	Content     string // Content of a Site (will be shown on hover)

	Completed bool // Indicator of completion
}

// Returns a new Site instance depending on a Map
func NewSiteFromMap(m Map) Site {
	return Site{
		Id: m.Elements.GetLastId() + 1,

		Title:       "New Site",
		Description: "",
		Content:     "",

		Completed: false,
	}
}

// Slice of Site type
type SiteSlice []Site

// IsSorted reports whether SiteSlice's element's Ids are sorted in ascending order or not
func (ss SiteSlice) IsSorted() bool {
	if len(ss) >= 2 {
		for i := 0; i < len(ss)-1; i++ {
			if ss[i].Id >= ss[i+1].Id {
				return false
			}
		}
	}
	return true
}

// SortById sorts ss by Site.Id in ascending order
//
// It does not allow duplicates
func (ss *SiteSlice) SortById() {
	if len(*ss) < 2 {
		log.Println(utils.WARNING_STR + " [SortById] called even if SiteSlice instance had a len < 2")
		return
	}

	slices.SortFunc(*ss, func(a, b Site) int {
		switch {
		case a.Id < b.Id:
			return -1
		case a.Id > b.Id:
			return 1
		default: // Id duplicate handling
			log.Println(utils.WARNING_STR + " [SortById] Id duplicate found")
			if settings.AutomaticIdSanitize {
				tmp := b.Id
				b.Id = uint(len(*ss)) + 1

				log.Printf("[SortById] Sanitized Site.Id from id=%v into id=%v", tmp, b.Id)
			}
			return 0
		}
	})

}

// Returns the Id of the last element of ss
func (ss SiteSlice) GetLastId() uint {
	if len(ss) == 0 {
		return 0
	}

	if !ss.IsSorted() {
		ss.SortById()
	}

	return ss[len(ss)-1].Id
}
