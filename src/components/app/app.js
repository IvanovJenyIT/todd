import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.scss';


export default class App extends Component {

    maxID = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term:'',
        filter:'all'
    }

    createTodoItem(label){
        return {
            label,
            important: false,
            done: false,
            id: this.maxID++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData})=>{
            const idx = todoData.findIndex((el)=>el.id === id);
            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return{
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem=this.createTodoItem(text);

        this.setState(({todoData})=>{
            const newArr = [...todoData, newItem];

            return{
                todoData: newArr
            }
        });
    }

    onToggleImportant =(id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    }

    toggleProperty(arr, id, propName){
        const idx = arr.findIndex((el)=>el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    onToggleDone =(id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    search(arr,term){
        if(term.length === 0){
            return arr;
        }

        return arr.filter((item)=>{
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        });
    }

    filter(items, filter){
        switch (filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((item)=> !item.done);
            case 'done':
                return items.filter((item)=> item.done);
            default:
                return items;
        }
    }

    onSearchChange = (term)=> {
        this.setState({term})
    };

    onFilterChange = (filter)=> {
        this.setState({filter})
    };

    render(){
        const {todoData, term, filter} = this.state;

        const visibility = this.filter(this.search(todoData,term), filter);

        const doneCount = todoData.filter(
            (el)=> el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter filter={filter}
                    onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList todos={visibility}
                          onDeleted={this.deleteItem}
                          onToggleImportant ={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }

};
