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
	Id uint

	Title       string // Title of a Site (will be written in bold)
	Description string // Short description of a Site (will be written in regular)
	Content     string // Content of a Site (will be shown on hover)

	Completed bool // Indicator of completion
}

// Slice of Site type
type SiteSlice []Site

func NewSiteFromMap(m Map) Site {
	return Site{
		Id: m.Elements.GetLastId() + 1,

		Title:       "New Site",
		Description: "",
		Content:     "",

		Completed: false,
	}
}

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

// Removes duplicates
func (ss *SiteSlice) Sanitize() {
	log.Println("[Sanitize] called")
	// was here
}

func (ss *SiteSlice) SortById() {
	if len(*ss) < 2 {
		log.Println(utils.WARNING_STR + " [SortById] called even if SiteSlice object had a len < 2")
		return
	}

	// Check for Id duplicates
	for i := 1; i < len(*ss); i++ {
		if (*ss)[i-1].Id == (*ss)[i].Id {
			ss.Sanitize()
			break
		}
	}

	// Sorts slice
	slices.SortFunc(*ss, func(a, b Site) int {
		switch {
		case a.Id < b.Id:
			return -1
		case a.Id > b.Id:
			return 1
		default:
			return 0
		}
	})

}

func (ss SiteSlice) GetLastId() uint {
	if !ss.IsSorted() {
		ss.SortById()
	}
	return ss[len(ss)-1].Id
}
