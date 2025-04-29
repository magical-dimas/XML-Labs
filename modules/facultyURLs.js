class FacultyURLs {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getFaculties() {
        return `${this.baseUrl}/faculties`;
    }

    getFacultyById(id) {
        return `${this.baseUrl}/faculties/${id}`;
    }

    createFaculty() {
        return `${this.baseUrl}/faculties`;
    }

    removeFacultyById() {
        return `${this.baseUrl}/faculties/${id}`;
    }

    updateFacultyById() {
        return `${this.baseUrl}/faculties/${id}`;
    }
}

export const stockUrls = new FacultyURLs();