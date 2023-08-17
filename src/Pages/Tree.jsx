import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid';
import RenderTree from '../Components/RenderTree';

const Tree = () => {
    const initialTree = JSON.parse(localStorage.getItem('tree')) || {
        name: 'root',
        data: 'root data',
        id: v4(),
        children: [
            {
                name: 'child1',
                data: 'child1 data',
                id: v4(),
                children: [
                    { name: 'child1-child1', data: "c1-c1 Hello", id: v4(), children: [] },
                    { name: 'child1-child2', data: "c1-c2 JS", id: v4(), children: [] }
                ]
            },
            { name: 'child2', data: "c2 World", id: v4(), children: [] }
        ]
    };
    const [jsonTreeData, setJsonTreeData] = useState("");
    const [tree, setTree] = useState(initialTree);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        // Save the tree to local storage whenever it changes
        localStorage.setItem('tree', JSON.stringify(tree));
        setJsonTreeData(JSON.stringify(tree));
    }, [tree]);


    return (
        <>
            <div id="treeWrapper" className='flex flex-col justify-center items-center w-full h-full'>
                <RenderTree tree={tree} setTree={setTree} name={tree.name} data={tree.data} id={tree.id} children={tree.children} />
                <button onClick={() => setShowData(!showData)} className='w-32 px-4 py-1 rounded hover:bg-gray-300 bg-gray-200 border-[1px] border-black font-bold'>Export Data</button>
                {
                    showData &&
                    <p className='px-8 py-2'>{jsonTreeData}</p>
                }
            </div>
        </>
    )
}



export default Tree
