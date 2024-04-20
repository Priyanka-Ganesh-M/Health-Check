import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DayLayout from './DayLayout';

function DocLayout({docs, submitTime})
{
    console.log(docs)
    return(
        <div>
        {docs.map((doc)=>
            (
            <div>
            <Card>
            <Card.Header>{doc.username}</Card.Header>
            <Card.Body>
                <Card.Title>{doc.specialization}</Card.Title>
                <DayLayout availability = {doc.availability} submitTime = {submitTime} doc = {doc._id}/>
                
            </Card.Body>
            </Card>
            <br/>
            </div>
            )
        )}
        </div>
    )
}

export default DocLayout;