import { useState } from 'react'
import './App.css'

function App() {

  const [persons, setPersons] = useState([
    { id: 1, name: 'John', age: 25, netWorth: 10000 },
    { id: 2, name: 'Alice', age: 30, netWorth: 15000 },
    { id: 3, name: 'Bob', age: 28, netWorth: 12000 }
  ]);

  const [editedName, setEditedName] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedNetWorth, setEditedNetWorth] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const handleWhich = (id) => {
    setSelectedId(id); 
    const person = persons.find(person => person.id === id); // Find the person object by ID
    
    if (person) {
      setEditedName(person.name); // Set the input value to the person's name
      setEditedAge(person.age); // Set the input value to the person's age
      setEditedNetWorth(person.netWorth); // Set the input value to the person's net worth
    } else {
      setEditedName(''); // Set input values to empty string if person not found
      setEditedAge('');
      setEditedNetWorth('');
    }
  };

  const handleSubmit = () => {
    if (selectedId !== null) { 
      setPersons(prevPersons => {
        return prevPersons.map(person => {
          if (person.id === selectedId) {
            return {
              ...person,
              name: editedName || person.name,
              age: editedAge || person.age,
              netWorth: editedNetWorth || person.netWorth
            };
          }
          return person;
        });
      });
      setEditedName('');
      setEditedAge('');
      setEditedNetWorth('');
      setSelectedId(null); 
    }
  };

  return (
    <div>
      <h1>Persons Information</h1>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            <div className="con">
              <p>Name: {person.name}, Age: {person.age}, Net Worth: ${person.netWorth}</p>
              <button onClick={() => handleWhich(person.id)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedId !== null && (
        <div className="">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id='name' 
              value={editedName} 
              onChange={(e) => setEditedName(e.target.value)} 
              placeholder="Name" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input 
              type="number" 
              id='age' 
              value={editedAge} 
              onChange={(e) => setEditedAge(e.target.value)} 
              placeholder="Age" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="netWorth">Net Worth</label>
            <input 
              type="number" 
              id='netWorth' 
              value={editedNetWorth} 
              onChange={(e) => setEditedNetWorth(e.target.value)} 
              placeholder="Net Worth" 
            />
          </div>
          <button onClick={handleSubmit}>Update</button>
        </div>
      )}
    </div>
  )
}

export default App
