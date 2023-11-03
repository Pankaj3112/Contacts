import React, { useState } from "react";

function Contact({ contact, setContacts }) {
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState(contact.username);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [website, setWebsite] = useState(contact.website);

  const handleDeleteClick = () => {
    const id = contact.id;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const options = {
      method: "DELETE",
    };

    fetch(url, options)
      .then((response) => response.json())
      .then(() => {
        setContacts((prevContacts) => {
          return prevContacts.filter((contact) => contact.id !== id);
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContact = {
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website,
    };

    const id = contact.id;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const options = {
      method: "PUT",
      body: JSON.stringify(updatedContact),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then(() => {
        setContacts((prevContacts) => {
          return prevContacts.map((contact) => {
            if (contact.id === id) {
              return { ...updatedContact, id: id };
            } else {
              return contact;
            }
          });
        });
      })
      .catch(() => {
        setContacts((prevContacts) => {
          return prevContacts.map((contact) => {
            if (contact.id === id) {
              return { ...updatedContact, id: id };
            } else {
              return contact;
            }
          });
        });
      });

    setEditable(false);
  };

  return (
    <div className="contact">
      {editable ? (
        <form className="contact" onSubmit={handleSubmit}>
          <div className="details">
            <div>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <input
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="left">
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="text"
                placeholder="Phone"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <input
                type="text"
                placeholder="Website"
                required
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
              />
            </div>
          </div>
          <div>
            <button onClick={() => setEditable(false)}>Go back</button>
            <button type="submit" className="add">
              Add
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="details">
            <div>
              <h1 className="username">@{contact.username}</h1>
              <h2 className="name">{contact.name}</h2>
            </div>

            <div>
              <p className="email"> {contact.email} </p>
              <p className="phone"> {contact.phone} </p>
              <p className="website"> {contact.website} </p>
            </div>
          </div>
          <div className="icons">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pencil"
              onClick={() => setEditable(true)}
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash"
              onClick={handleDeleteClick}
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

export default Contact;
