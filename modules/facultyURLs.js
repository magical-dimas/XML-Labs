class FacultyURLs {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getFaculties() {
        return `${this.baseUrl}/faculties`;
    }

    getFilteredFaculties(filter) {
        return `${this.baseUrl}/faculties?title=${filter}`;
    }

    getFacultyById(id) {
        return `${this.baseUrl}/faculties/${id}`;
    }

    createFaculty() {
        return `${this.baseUrl}/faculties`;
    }

    removeFacultyById(id) {
        return `${this.baseUrl}/faculties/${id}`;
    }

    updateFacultyById(id) {
        return `${this.baseUrl}/faculties/${id}`;
    }
}

export const facultyURLs = new FacultyURLs();