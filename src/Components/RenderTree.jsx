import React, { useState } from 'react'
import { v4 } from 'uuid';
import { updateChildData, updateChildName, addChildToTree } from './functions';


const RenderTree = ({ tree, setTree, name, data, id, children }) => {
    const [hideChildren, setHideChildren] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [nodeName, setNodeName] = useState("");
    const [nodeData, setNodeData] = useState("");

    const addChild = (id, nodeData, nodeName) => {
        const targetChildId = id;
        const newChild = {
            name: nodeName,
            data: nodeData,
            id: v4(),
            children: [],
        };

        const updatedTree = addChildToTree(tree, targetChildId, newChild);
        setTree(updatedTree)
        setShowInput(!showInput);
    }

    const updateChild = (id, updateNodeData) => {
        const targetChildId = id;
        const updatedTree = updateChildData(tree, targetChildId, updateNodeData);
        setTree(updatedTree)
        setHideChildren(!hideChildren);
    }

    const childName = (id, updateNodeName) => {
        const targetChildId = id;
        const updatedTree = updateChildName(tree, targetChildId, updateNodeName);
        setTree(updatedTree)
        setShowNameInput(!showNameInput);
    }

    return (
        <ul className='w-full mx-4 p-4 ml-0 border-l-2 border-black'>
            <li className='w-[85vw] sm:w-3/4  flex justify-between py-2 px-4 font-bold bg-gray-300 '>
                <div className='flex'>
                    <button className='px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded hover:cursor-pointer' onClick={() => setHideChildren(!hideChildren)} >{hideChildren ? ">" : "^"}</button>
                    {
                        showNameInput ?
                            <div className='pl-4 flex'>
                                {/* Text field to change name of node */}
                                <input onChange={(e) => setNodeName(e.target.value)} className='flex justify-between py-2 px-4 font-bold bg-gray-200' type="text" placeholder={name} />
                                <button onClick={() => childName(id, nodeName)} className='ml-8 px-4 py-1 rounded hover:bg-gray-300 bg-gray-200'>Change Node Name</button>
                            </div> :
                            <span onClick={() => setShowNameInput(!showNameInput)} className='hover:cursor-pointer pt-1 pl-2 font-normal'>{name}</span>
                    }
                </div>
                <div className='flex'>
                    <button onClick={() => setShowInput(!showInput)} className='px-4 py-1 rounded hover:bg-gray-200 bg-gray-100'>Add Child</button>
                    {/* Form to add new node */}
                    <div className={`${showInput ? "flex flex-col h-32 justify-between" : "hidden"} bg-gray-300 p-2 rounded absolute right-12`}>
                        <input type="text" onChange={(e) => setNodeName(e.target.value)} className='px-4 py-1 rounded hover:bg-gray-200 bg-gray-100' placeholder='Node Name' />
                        <input type="text" onChange={(e) => setNodeData(e.target.value)} className='px-4 py-1 rounded hover:bg-gray-200 bg-gray-100' placeholder='Data of node' />
                        <button onClick={() => addChild(id, nodeData, nodeName)} className='px-4 py-1 rounded hover:bg-gray-200 bg-gray-100'>Add Node</button>
                    </div>
                </div>
            </li>
            {/* Text field to edit child data */}
            {
                !hideChildren &&
                <div className='w-full flex'>
                    <input onChange={(e) => setNodeData(e.target.value)} className='w-2/4  flex justify-between py-2 px-4 font-bold bg-gray-200' type="text" placeholder={data} />
                    <button onClick={() => updateChild(id, nodeData)} className='ml-8 px-3 text-sm sm:text-base sm:px-4 py-1 rounded hover:bg-gray-300 bg-gray-200'>Change Data</button>
                </div>
            }
            {/* Recursive call to print child of node  */}
            <ul className={`${hideChildren ? "hidden" : ""}`}>
                {
                    children?.map((child, key) => {
                        return (

                            <RenderTree key={key} name={child.name} tree={tree} setTree={setTree} id={(child.id)} data={child.data} children={child.children} />
                        );
                    })
                }
            </ul>
        </ul>
    )
}

export default RenderTree
