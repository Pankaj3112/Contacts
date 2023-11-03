import React, { useState } from "react";

function AddContact({ setContacts }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const contact = {
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website,
    };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(contact),
    })
      .then((response) => response.json())
      .then((data) => {
		contact.id = data.id;
        setContacts((prevContacts) => [contact, ...prevContacts]);
		setUsername("");
		setName("");
		setEmail("");
		setPhone("");
		setWebsite("");
      });
  };

  return (
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
        <button type="submit" className="add">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddContact;
