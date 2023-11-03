import React, { useEffect, useState } from "react";
import { AddContact, Contact } from "./";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
      });
  }, []);

  return (
    <>
      <AddContact setContacts={setContacts} />

      <div className="contact-list">
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            setContacts={setContacts}
          />
        ))}
      </div>
    </>
  );
}

export default ContactList;
