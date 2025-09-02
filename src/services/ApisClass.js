import axios from "axios";
const baseUrl = "https://note-sigma-black.vercel.app/";

class ApiServices {
  //  Register to Note app
  register(data) {
    return axios.post(baseUrl + "api/v1/users/signUp", data);
  }

  //  Login to Note app
  login(data) {
    return axios.post(baseUrl + "api/v1/users/signIn", data);
  }

  //  Create New Note
  addNewNote(data) {
    return axios.post(baseUrl + "api/v1/notes", data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // Get user Notes
  getUserNotes() {
    return axios.get(baseUrl + "api/v1/notes", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // Update Specific Note
  updateNote(noteId, newData) {
    return axios.put(baseUrl + "api/v1/notes/" + noteId, newData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // Delete Specific Note
  deleteNote(noteId) {
    return axios.delete(baseUrl + "api/v1/notes/" + noteId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
}

export const apiServices = new ApiServices();
