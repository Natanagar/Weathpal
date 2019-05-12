import React, {useState, useEffect} from "react";
import Downshift from 'downshift';
import matchSorter from "match-sorter";
import styled from "styled-components";
import { Button } from '../Button/Button'
import { arrayFromData } from '../utils/utils'

const GrayButton = styled(()=>Button)`
  color: #2d5986;
  border-color: #13263a;
`
const stateReducer = (state, changes)=> {
    if(changes.type === Downshift.stateChangeTypes.blurButton){
        return {...changes, isOpen : true }
    }
    return changes
}

export const InputAutocomplete = ({ currency }) => {
    const[open, changeOpen] = useState(false);
    const handleChanges = changes => {
        console.log(changes)
        if(changes.hasOwnProperty('isOpen')&& changes.type !== Downshift.stateChangeTypes.blurButton){
            changeOpen({
                open: changes.isOpen
            })
        }
    } 
    const items = Object.keys(currency).map(item => ({
        value : item,
        id : item.toLowerCase(),
    }));
const getItems = value => value ? matchSorter(items, value, {keys : ['value']}) : items
const itemToString = item => (item ? item.value : '')
return(
        
    <div>
        <Downshift stateReducer={stateReducer} defaultValue='EUR' isOpen={open} onStateChange={handleChanges} itemToString={itemToString}>
            {({ getLabelProps, 
                getInputProps,  
                getMenuProps, 
                selectItem,
                getItemProps,
                getToggleButtonProps,
               //we can put to state or useState
                clearSelection,

                inputValue,
                selectedItem,
                highlightedIndex,
                isOpen
                }) => <div>
            <label htmlFor="input"{...getLabelProps()}>Choose currency</label>
                <input 
                {...getInputProps()}
                />
                {open ? <Button as GrayButton {...getToggleButtonProps()}data={'open'}/> : <Button onClick={clearSelection} data={'close'}/> }
                
                {selectedItem ? <Button onClick={clearSelection} data={'close'}/> : null} 
                <ul {...getMenuProps({
                    style: {height : 150, overflow : 'scroll'}
                })}>
                    {open ? getItems(inputValue).map((item, index) => (
                        <li {...getItemProps({ 
                            item, 
                            key : item.id, 
                            style : {
                            backgroundColor : 
                            index === highlightedIndex ? 'gray' : null
                        },
                    })}
                        >
                        {item.value}
                        </li>
                    )) : null}
                </ul>
            </div>}
        </Downshift>
    </div>
    )
}