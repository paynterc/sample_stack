import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SampleForm(props) {

        // const [someVariable, functionToSetSomeVariable] = useState('default value');
        const [porVal, setPorVal] = useState(false);

        const handleSetName = (e) => {
            console.log('e',e);
        }

        const handleSetTempPorVal = (e) => {
            console.log('e target checked',e);
            setPorVal(e);
        }
//<Form.Label>Sample Form</Form.Label>
        return (
        <>
            <h3>Forms</h3>


            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Name
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  id="new-version-name"
                  defaultValue = {'default'}
                  onChange={e => handleSetName(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="por-switch"
                  label="Set Value"
                  onChange={e => handleSetTempPorVal(e.target.checked)}
                />
                <span style={{'marginLeft':'1em'}}>{porVal.toString()}</span>
            </InputGroup>

        </>
        );
}

export default SampleForm;
