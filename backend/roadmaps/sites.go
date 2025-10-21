package roadmaps

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
		Id: uint(len(m.Elements)),

		Title:       "New Site",
		Description: "",
		Content:     "",

		Completed: false,
	}
}

// Slice of Site type
type SiteSlice []Site

func (ss *SiteSlice) Insert(s Site) {
	// was here
}
