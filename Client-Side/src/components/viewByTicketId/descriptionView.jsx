import { Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const DescriptionView = ({ item,updateDescription }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const project = sessionStorage.getItem('project');
    const [content, setContent] = useState(item.details);
    const [isPaste, setIsPaste] = useState(false);
    const [text, setText] = useState(false);
    const [editDes, setEditDes] = useState(item.description);

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true); // Open the drawer
    };

    const handleClose = () => {
        setOpen(false); // Close the drawer
        navigate(`/auth/${project}/testcases`); // Navigate back to the main test case view
    };


    const handleChange = (e) => {
        setEditDes(e.target.value)
    }
    const handlePaste = (event) => {
        setIsPaste(true);
        const clipboard = event.clipboardData;
        const items = clipboard.items;
        const text = clipboard.getData('Text');
        console.log(content.html[0]);
        setContent((prev) => ({
            body:[
               `${prev.body} ${text}`
             ],
            html:
                [ 
                   `${prev.html} <p>${text}</p>`
                 ]
            
        }))

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                if (blob) {
                    setContent((prev) =>({
                        body:[
                            
                            `${prev.body}\n[Image] ${URL.createObjectURL(blob)}`
                        ],
                        html:[
                           
                            ` ${prev.html} <a href='${URL.createObjectURL(blob)}' target='blank' ><img src='${URL.createObjectURL(blob)}' /></a>`
                        ]
                    }) );
                }
            }

        }

        event.preventDefault();
        setIsPaste(false);
        console.log(isPaste);
        console.log(content)
    };

    const handleComments = (e)=>{
       if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default behavior on Enter key
        setContent((prev) => ({
            body: [...prev.body, '\n'], // Add a new line if desired
            html: [...prev.html, '<br />'], // Add a line break in HTML
        }));
    } else {
        // Update the content for other key inputs
        setContent((prev) => ({
            body: [`${e.target.value}`],
            html: [`<p>${e.target.value}</p>`],
        }));
    }
    }

    return (
        <React.Fragment>
            <p>
                <Link to={`/auth/${project}/testcases/viewTestCase/${item.id}`} onClick={handleOpen}>
                    {item.description}
                </Link>
            </p>

            <Drawer
                sx={{ width: '70vw' }}
                PaperProps={{ sx: { width: '70vw', borderRadius: '10px 0 0 10px' } }}
                open={open}
                onClose={handleClose}
                anchor='right'
            >
                {open && (
                    <div style={{ margin: '10px' }}>
                        <CloseIcon
                            style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                            onClick={handleClose}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px', alignItems: 'center' }}>
                            {flag ? (
                                <div style={{ width: '80%' }}>
                                    {flag ? <input value={editDes} onChange={handleChange}
                                        style={{ width: '100%', border: 'none', boxSizing: 'border-box', Border: '2px solid green', fontSize: '19px' }}></input>
                                        : <p>{item.description}</p>
                                    }
                                </div>
                            ) : (
                                <p style={{ width: '90%' }}>{item.description}</p>
                            )}
                            {!flag ? (
                                <button onClick={() => setFlag(true)} style={{ width: '7%', height: '30px', marginLeft: '10px' }}>
                                    Edit
                                </button>
                            ) : (
                                <>
                                    <button style={{ height: '30px', marginLeft: '10px' }} onClick={()=>{updateDescription({description:editDes}, item.id); setFlag(false)}}>Save</button>
                                    <button onClick={() => setFlag(false)} style={{ height: '30px', marginLeft: '10px' }}>
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>

                        {
                            text ? (<textarea value={content.body}
                        
                                onChange={(e) => { if (!isPaste) { handleComments(e) } }}
                                onPaste={handlePaste}
                                style={{
                                    border: '2px solid black',
                                    width: '100%',
                                    height: '100%',
                                    marginTop: '20px',
                                    padding: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
    
    
                            </textarea>) :
                            (
                               item.details ? <div dangerouslySetInnerHTML={{__html:`${item.details.html}`}} /> : <div> <p>No details preview</p></div>
                            )
                        }
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: '100%' }}>
                            <p style={{ flexGrow: 1 }}>last edit by: {item.lastedit}</p>

                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                               {
                                text ? (
                                    <>
                                    <button onClick={(e)=>{setText(false)}}>Cancel</button>
                                    <button onClick={(e)=>{updateDescription({details:content}, item.id); setText(false)}}>Update comment</button>
                                    </>
                                ):
                                (
                                    <button onClick={(e)=>{setText(true)}}>Edit</button>
                                )
                               }
                            </div>
                        </div>


                    </div>
                )}
            </Drawer>
        </React.Fragment>
    );
};

export default DescriptionView;
