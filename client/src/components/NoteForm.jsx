// NoteForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NoteForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      const response = await fetch(
        `http://localhost:5050/note/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const note = await response.json();
      if (!note) {
        console.warn(`Note with id ${params.id} not found`);
        navigate("/");
        return;
      }
      setForm(note);
    }
    fetchNote();
  }, [params.id, navigate]);

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch("http://localhost:5050/note");
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const notes = await response.json();
      setNotes(notes);
    }
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    // Logic to delete note in the backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (params.id) {
        response = await fetch(`http://localhost:5050/note/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      } else {
        response = await fetch("http://localhost:5050/note", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save note");
      }
      navigate("/"); // Redirect to the home page after saving the note
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4"></h3>
      <form onSubmit={handleSubmit} className="border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Note Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Content
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <textarea
                    name="content"
                    id="content"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Note"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
  
    </>
  );
}
