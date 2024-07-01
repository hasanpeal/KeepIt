import { Card, CardContent, CardDescription, CardTitle } from "keep-react";
import "./Todo.css";
import { Input } from "keep-react";
import { Button } from "keep-react";
import { useLocation} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { email, password } = location.state as {
          email: string;
          password: string;
        };
        const result = await axios.post("http://localhost:3001/todos", {
          email,
          password,
        });
        const todosFromServer: string[] = result.data.todos;
        setTodos(todosFromServer);
        setItems(todosFromServer);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [location.state]);

  function handleText(event: React.ChangeEvent<HTMLInputElement>): void {
    setText(event.target.value);
  }

  async function handleAdd(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const { email } = location.state;
    try{
        console.log("PPP Email and text: " + email + " " + text);
        const result = await axios.post("http://localhost:3001/add", {
            email, text
        });
        setItems((prevItems) => {
          return [...prevItems, text];
        });
        setText("");
        console.log(result.data.message);
    } catch{
        console.log("Error adding task");
    }
  }

  async function handleDelete(event: React.FormEvent<HTMLFormElement>, index: number): Promise<void> {
        event.preventDefault();
        const { email } = location.state;
        await axios.post("http://localhost:3001/delete", {email: email, note: items[index]});
        setItems(prevItems => {
            return prevItems.filter((_, i) => i !== index);
        });
   }

  return (
    <div className="Todo grid-cols-1">
      <div className="Title">
        <Card>
          <CardContent>
            <CardTitle className="TitleText">To Do List</CardTitle>
            <CardDescription> Keep track of to do</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="Input">
        <Input
          placeholder="Enter to do"
          type="text"
          value={text}
          onChange={handleText}
        />
      </div>
      <div>
        <form onSubmit={handleAdd}>
          <Button
            type="submit"
            color="secondary"
            variant="outline"
            className="ButtonEdit"
          >
            Add
          </Button>
        </form>
      </div>

      <div className="Items">
        {items.map((item, index) => (
          <div className="IndCard" key={index}>
            <Card className="max-w-md">
              <CardContent>
                <CardDescription> {item} </CardDescription>
              </CardContent>
              <form onSubmit={(event) => handleDelete(event, index)}>
                <Button
                  shape="circle"
                  color="error"
                  size=""
                  className="IndButton"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                  >
                    <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
                  </svg>
                </Button>
              </form>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
