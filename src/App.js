import { useState } from 'react';
import './App.css';

function App() {
  const [id, setId] = useState("");
  const handleId = ({ target: { value } }) => setId(value)

  const [pw, setPw] = useState("");
  const handlePw = ({ target: { value } }) => setPw(value)
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://graphql-ts.vercel.app/`;
    const query = `mutation{
                    login (email: "${id}", password: "${pw}") 
                    {token}
                  }`;
    fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ query }),
    })
      .then( (res) => res.json() )
      .then( (output) => {
        console.log(output)
        if ('errors' in output) {
            if(output.errors[0].message === 'No Such User Found') {
                alert("아이디가 틀렸습니다.");
            }
            else if (output.errors[0].message === 'Invalid Password') {
                alert("비밀번호가 틀렸습니다.");
            }
        }
        else {console.log(output.data.login.token)}
      } )
  }

  return (
    <body>
      <div className="template">
        <h1>Homepage</h1>
        <form onSubmit={handleSubmit} className='login'>
          <input 
            className="into_value"
            type='text'
            value={id}
            onChange={handleId}
          />
          <input
            className="into_value"
            type='text'
            value={pw}
            onChange={handlePw}
          />
          <button className="into_value" type='submit'>Click!</button>
        </form>
      </div>
    </body>
  );
}

export default App;
