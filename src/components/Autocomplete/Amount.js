import React, {useState, useEffect} from "react";
import Downshift from 'downshift';
import matchSorter from "match-sorter";
import styled from "styled-components";
import { Button } from '../Button/Button';
import { list } from '../Data/Amount'

list.map(item=>(console.log(item.value)))

const LightButton = styled(()=>Button)`
    color: tomato;
    border-color: tomato;
`
const getAmount = value => value ? matchSorter(list, value, {keys : ['value']}) : list

const itemToString = item => item ? item.value : " ";

const stateReducer = (state, changes) => {
    if(changes.type === Downshift.stateChangeTypes.blurButton){
        return {...changes, isOpen : true}
    }
    return changes
}
 
export const Amount = ({ getAmount, changes }) => {
    
    return(
        <div>
            <Downshift stateReducer={stateReducer}  itemToString={itemToString}>
        {({
            getInputProps,
            getLabelProps,
            getMenuProps,
            getToggleButtonProps,
            getItemProps,
            selectItem,
            highlightedIndex,
            selectedItems,
            clearItem,

            isOpen,
            inputValue
        }
        
        ) => (<div>
        <label {... getLabelProps()} htmlFor="amount"/>
        <input 
        id="amount" 
        type="text" 
        defaultValue="Amount"
        {...getInputProps()}
        />
        <Button 
        {...getToggleButtonProps()}
        data={'calculate'}
        
        >{isOpen ? 'close' : 'open'}</Button>
        {selectedItems ? 
        <Button 
        data={'clear'} 
        onClick = {clearItem}
        /> : null }
        <ul {...getMenuProps({
            style : {
                height : 250, overflowY : 'scroll'
            }
        })}>
        {isOpen ? getAmount(inputValue).map((item, index) => 
            <li 
            key={item.id}
            {...getItemProps({ 
                item, 
                key : item.id, 
                style : {
                background : highlightedIndex ? 'lightgray' : null
            } })}
            >
            {item.value}</li>
            ) : null}

        </ul>

    </div>)}
                
            </Downshift>
        </div>

    )
}