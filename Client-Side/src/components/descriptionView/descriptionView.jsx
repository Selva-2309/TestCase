import { Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DropdownStatus from '../dropDowns/DropdownStatus.jsx';
import DropdownAssignee from '../dropDowns/DropdownAssignee.jsx';
import convertTextToHTML from './convertTextToHTML.js';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import '../../../src/App.css'
import { UserContext } from '../contextFile.jsx';

const DescriptionView = ({item}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const project = Cookies.get('project');
    const [content, setContent] = useState(item.details ? item.details : { body: "", html: "", date: "" });
    const [isPaste, setIsPaste] = useState(false);
    const [text, setText] = useState(false);
    const [editDes, setEditDes] = useState(item.description);
    const inputRef = useRef();
    const token = Cookies.get("token");
    const updateDescription = useContext(UserContext);

    useEffect(() => {
        if (flag) {
            inputRef.current.focus();
        }
    }, [flag])

    const handleOpen = (e) => {
        setOpen(true); // Open the drawer
    };

    const handleClose = () => {
        setOpen(false); // Close the drawer
        navigate(`/auth/${project}/testcases`); // Navigate back to the main test case view
    };

    const handleChange = (e) => {
        setEditDes(e.target.value);

    };

    const handlePaste = async (event) => {
        setIsPaste(true);
        const clipboard = event.clipboardData;
        const items = clipboard.items;
        let text = clipboard.getData('Text');
        text = handleLocation(event, text);
        setContent((prev) => ({

            body: text// Update the plain text content

        }));

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                if (blob) {
                    await sendBlob(blob).then((response) => {
                        let file = handleLocation(event, response)
                        setContent((prev) => ({
                            body: file

                        }));
                    }).catch((error) => {
                        console.log(error);
                    })

                }
            }
        }

        event.preventDefault();
        setTimeout(() => {
            const input = event.target;
            input.focus(); // Ensure the input is focused
            input.setSelectionRange(input.value.length, input.value.length); // Move cursor to end
        }, 0);
        setIsPaste(false);
    };

    const handleLocation = (e, pasteValue) => {
        e.preventDefault();
        const input = e.target;
        const start = input.selectionStart;
        const end = input.selectionEnd;

        const currentValue = input.value;
        let newValue = "";
        if (pasteValue.includes('http')) {
            console.log("image" + pasteValue)
            newValue = currentValue.slice(0, start) + `\n [Image](${pasteValue}) \n` + currentValue.slice(end);
        } else {
            newValue = currentValue.slice(0, start) + pasteValue + currentValue.slice(end);
        }

        const cursor = start + pasteValue.length;
        input.setSelectionRange(cursor, cursor);
        return newValue;
    };

    const sendBlob = async (blob) => {
        return await new Promise(async (resolve, reject) => {
            try {
                const formdata = new FormData();
                formdata.append('file', blob)
                const response = await axios.post(`http://localhost:4000/services/objects/upload`, formdata, {
                    headers: {
                        'Content-Type': 'multipart/formdata',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const url = await response.data.ImageUrl;
                resolve(url);
            } catch (error) {
                reject(error);
            }
        })
    }

    const handleComments = (e) => {
        const inputText = e.target.value;
        console.log(!inputText ? null : inputText);
        setContent((prev) => ({

            body: inputText
        }));
    };

    const updateDes = () => {
        const html = content?.body ? content.body : "no description preview";

        content.html = convertTextToHTML(html);
        const date = Date.now();
        content.date = new Date(date).toISOString();

        updateDescription({ details: content }, item.id);
        setText(false);
    }




    return (
        <React.Fragment>
            <div style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',width:'700px' }} >
                <Link onClick={handleOpen} to={`/auth/${project}/testcases/viewTestCase/${item.id}`}  style={{textDecoration:'none', color:'black'}} className='description'>
                    {item.description}
                </Link>
            </div>

            <Drawer
                sx={{ width: '10vw', overflowX: "hidden" }}
                PaperProps={{ sx: { width: '85vw', borderRadius: '10px 0 0 10px', overflowX: "hidden", overflowY: "auto" } }}
                open={open}
                onClose={handleClose}
                anchor='right'
            >
                {open && (
                    <div style={{ margin: '10px' }}>
                        <div style={{ borderBottom: "2px solid grey", padding: "10px" }}>
                            <CloseIcon
                                style={{ position: 'absolute', right: '20px', top: '10px', cursor: 'pointer' }}
                                onClick={handleClose}
                            />
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', alignItems: 'center' }}>
                                {flag ? (
                                    <div style={{ width: '80%' }}>
                                        {flag ? (
                                            <input value={editDes} onChange={handleChange} ref={inputRef}
                                                style={{ width: '100%', border: 'none', fontSize: '19px' }} />
                                        ) : <p>{item.description}</p>}
                                    </div>
                                ) : (
                                    <p style={{ width: '90%', fontSize: "30px" }}>{item.description}</p>
                                )}
                                {!flag ? (
                                    <button onClick={() => setFlag(true)} style={{ marginLeft: '10px' }} class="btn btn-success">
                                        Edit
                                    </button>
                                ) : (
                                    <>
                                        <button style={{ marginLeft: '10px' }} class="btn btn-success" onClick={() => { updateDescription({ description: editDes }, item.id); setFlag(false); }}>Save</button>
                                        <button onClick={(e) => {setFlag(false); setEditDes(item.description)}} class="btn btn-light" style={{ color: "red", border: "1px solid red", marginLeft: "10px" }}>Cancel</button>
                                    </>
                                )}

                            </div>
                            <div>
                                {
                                    !flag && <div >
                                        <div style={{ flexGrow: 1, display: "flex" }}>
                                            <p style={{ padding: "3px", margin: "2px" }}>{item?.lastedit ? item.lastedit : item.createdby}</p>
                                            <p style={{ padding: "3px", margin: "3px", fontSize: "12px", alignContent: "end" }}>{
                                                item?.lasteditdate ? moment(item?.lasteditdate).fromNow() : moment(item?.created_date).fromNow()
                                            }{item?.lasteditdate ? "(edited)" : "(opened)"}</p>
                                        </div>

                                    </div>
                                }
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: "row", width: "100" }}>
                            <div style={{ flexGrow: 1, borderRight: "2px grey solid", height: "100vh", paddingRight: "5px" }}>
                                <div style={{ boxSizing: "border-box", borderRadius: "6px", border: "1px solid grey", margin: "5px" }}>
                                    {
                                        !text && <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: '100%', backgroundColor: "#f5f0f0" }}>
                                            <div style={{ flexGrow: 1, display: "flex" }}>
                                                <p style={{ padding: "3px", margin: "2px" }}>{item?.lastedit ? item.lastedit : item.createdby}</p>
                                                <p style={{ padding: "3px", margin: "3px", fontSize: "12px", alignContent: "end" }}>{
                                                   item?.details?.date ? moment(item?.details?.date).fromNow() : moment(item?.created_date).fromNow()
                                                }{item?.details?.date ? "(edited)" : "(opened)"}</p>
                                            </div>
                                            {
                                                !text && (<button onClick={() => { setText(true); }} class="btn btn-success" style={{ marginRight: '10px', margin: "5px" }}>Edit</button>)
                                            }
                                        </div>
                                    }
                                    {text ? (
                                        <textarea
                                            value={content?.body ? content.body : ""}
                                            onChange={(e) => { if (!isPaste) { handleComments(e); } }}
                                            onPaste={handlePaste}
                                            style={{
                                                border: '2px solid black',
                                                width: '100%',
                                                height: '100%',
                                                minHeight: '300px',
                                                padding: '10px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        />
                                    ) : (
                                        item.details ? <div dangerouslySetInnerHTML={{ __html: `${item?.details?.html}` }} style={{ margin: "5px" }} /> : <div><p>No details preview</p></div>
                                    )}
                                </div>


                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: "flex-end", padding: "5px" }}>
                                    {text &&
                                        <>
                                            <button onClick={() => { setText(false); }} class="btn btn-light" style={{ color: "red", border: "1px solid red" }} >Cancel</button>
                                            <button onClick={(e) => { updateDes() }} class="btn btn-success">Update comment</button>
                                        </>
                                    }
                                </div>

                            </div>
                            <div style={{ width: "25%", height: "100%", boxSizing: "border-box" }}>

                                <dl style={{ margin: '10px' }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: 'baseline' }}>
                                        <dt style={{ width: '50%' }}>Assignee</dt>
                                        <dd>{<DropdownAssignee item={item}  />}</dd>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: 'baseline' }}>
                                        <dt style={{ width: '50%' }}>Status</dt>
                                        <dd>{<DropdownStatus item={item}  />}</dd>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: 'baseline' }} >
                                        <dt style={{ width: '55%' }}>IssueId</dt>
                                        <dd>{item.issueid}</dd>
                                    </div>
                                </dl>


                            </div>
                        </div>
                    </div>
                )}
            </Drawer>
        </React.Fragment>
    );
};

export default DescriptionView;
