package roadmaps

// A map is becoming handy when man needs to find his path
//
// Structure where are stored all the different tasks the user wants to achieve in ascending order
type Map struct {
	title    string    // Title of the whole roadmap
	elements SiteSlice // An ordered slice containing each user's Site
}

// Returns a new Map instance
func NewMap() Map {
	return Map{
		title:    "New Roadmap",
		elements: make(SiteSlice, 0),
	}
}

// Add a Site instance to a Map
func (m *Map) Add(s Site) {
	m.elements.Insert(s)
}

// Delete a Site instance to a Map
func (m *Map) Delete(s Site) {
	m.elements.Remove(s)
}
