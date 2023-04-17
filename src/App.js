import "./app.scss"
import {CiInboxOut} from "react-icons/ci";
import {HiOutlineTrash} from "react-icons/hi";
import {useGetTodoQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation} from "./redux/ApiSlice";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from "@mui/material/CircularProgress";
import CircularUnderLoad from "./Loading";
import {red} from "@mui/material/colors";

function App() {
    const [value, setValue] = useState('')
    const {data, isLoading, error} = useGetTodoQuery()
    const [updateTodo] = useUpdateTodoMutation()
    const [addTodo] = useAddTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    let animate =  document.querySelector('.animation')

    const addValue = (e) => {
        e.preventDefault()
        addTodo({
            id: uuidv4,
            title: value,
            complete: false
        })
        setValue('')
        animate.classList.add('animate')
        setTimeout(() => {
            animate.classList.remove("animate")
        },900)


    }
    return (
        <div className="app">
            <div className="app__wrapper">
                <h1 className="app__title">Todo List</h1>
                <div className="app__new">
                    <label className={'app__label'} htmlFor="">
                        <input value={value} onChange={(e) => setValue(e.target.value)} className={'app__input'}
                               placeholder={'Enter new todo'} type="text"/>
                    </label>
                    <button disabled={value === '' ? true : ''}  style={{background: value ? "#CC39FF    " : ''}} onClick={addValue} className={'app__add animation'}>
                        <CiInboxOut color={"#fff"} size={30}/>
                    </button>
                </div>
                {
                    isLoading ? <CircularUnderLoad/>
                        : error ? <p>error</p> :
                            data.map((item) => (
                                <div className="app__block">
                                    <div className="app__box">
                                        <div className="app__inner">
                                            <label htmlFor="" className="app__for">
                                                <input onChange={() => updateTodo({...item, complete: !item.complete})}
                                                       checked={item.complete} type="checkbox" className="app__check"/>
                                            </label>
                                            <h2 className="app__subtitle">{item.title}</h2>
                                        </div>
                                        <button onClick={() => deleteTodo({id: item.id})} className={'app__clear'}>
                                            <HiOutlineTrash color={"#CC39FF"} size={25}/>
                                        </button>
                                    </div>
                                </div>

                    ))
                }


            </div>

        </div>
    );
}

export default App;
