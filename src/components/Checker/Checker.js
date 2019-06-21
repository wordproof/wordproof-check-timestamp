import React, {Component} from 'react';
import {sha256} from 'js-sha256';
import {Field, Label, Control, TextArea, Button, Input, Help, Notification} from 'bloomer';

class Checker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: null,
      inputContent: null,
      inputHash: null,
      generatedHash: null,
      valid: null
    }
  }

  setContent = (e) => {
    this.setState({
      inputContent: e.target.value
    })
    console.log(e.target.value);
  }
  setHash = (e) => {
    this.setState({
      inputHash: e.target.value
    })
  }

  hashContent = () => {
    let content = this.state.inputContent;
    let hash = sha256(content);
    if (hash === this.state.inputHash) {
      this.setState({
        isDisabled: true,
        valid: true,
        generatedHash: hash
      })
    } else {
      this.setState({
        isDisabled: true,
        valid: false,
        generatedHash: hash
      })
    }
  }

  render() {
    return (
      <div className="checker">
        <Field>
          <Label>Blockchain Hash</Label>
          <Control>
            <Input onChange={this.setHash} type="text"
                   placeholder='e.g. a93963adb1734e799f47ab87a9b4de784dd3c276f07bfcc9234acb1d82080100'/>
            <Help>The hash retrieved from the blockchain</Help>
          </Control>
        </Field>
        <Field>
          <Label>Raw Content</Label>
          <Control>
            <TextArea onChange={this.setContent} rows={10} placeholder={'{"title":"", "content":"", "date":""}'}/>
            <Help>A JSON-object containing the title, content and date</Help>
          </Control>
        </Field>
        <Button isColor="primary" disabled={this.state.isDisabled} onClick={this.hashContent}>Generate Hash</Button>

        <div className="result">
          {(this.state.valid === true) || (this.state.valid === true) ?
            <Field>
              <Label>Generated Hash</Label>
              <Control>
                <Input readOnly value={this.state.generatedHash}/>
              </Control>
            </Field> : ''
          }

          {(this.state.valid === true) ?
            <Notification isColor="success">GOOD</Notification> : ''
          }

          {(this.state.valid === false) ?
            <Notification isColor="warning">NOT GOOD</Notification> : ''
          }
        </div>
      </div>
    );
  }
}

export default Checker;