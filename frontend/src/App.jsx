
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState([]);
  const [valueInputName, setValueInputName] = useState("");

    useEffect(() => {
     getData();
    }, []);

    async function getData(){
      await fetch("http://localhost:3010/get-data")
      .then((res) => res.json())
      .then((result) => setData(result.data));
    }


    async function addNewUser(event){
      event.preventDefault();

      const newUser = {
        "firstname": valueInputName,
        "lastname": "Тут будет фамилия",
      };

      const response = await fetch("http://localhost:3010/add-new-user", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      });

      getData();
    }


    async function deleteUser(event) {
      event.preventDefault();

      const userNameForSearch = valueInputName;

      const response = await fetch("http://localhost:3010/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({firstname: userNameForSearch})
      });

      getData();
    }



  return (
    <div className="container">
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.firstname}
          </li>
        ))}
      </ul>

      <form action="" className="container_form">
        <input type="text" placeholder='Введите имя' className='name_input' value={valueInputName} onChange={(event) => setValueInputName(event.target.value)}/>
        <button className="add_button" onClick={addNewUser}>Добавить</button>
        <button className="delete_button" onClick={deleteUser}>Удалить</button>
      </form>
    </div>
  )
}

export default App
