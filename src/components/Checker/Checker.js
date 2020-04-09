import React, {Component} from 'react';
import {sha256} from 'js-sha256';
import {Field, Label, Control, TextArea, Button, Input, Help, Notification} from 'bloomer';

class Checker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: null,
            inputContent: '',
            inputHash: '',
            generatedHash: null,
            valid: null,
            fileUpload: false,
            fileHash: null,
            fileName: '',
        }
    }

    componentDidMount() {
        this.checkForHash();
    }

    checkForHash = () => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('hash')) {
            this.setState({inputHash: searchParams.get('hash')});
        }
    }

    setHash = (e) => {
        let content = e.target.value;
        content = content.replace(' ', '');
        content = content.trim();
        this.setState({
            inputHash: content
        })
    }

    setContent = (e) => {
        let content = e.target.value;
        content = content.replace(/[\r\n]+/gm, '');
        content = content.trim();
        this.setState({
            inputContent: content
        });

        this.checkForMediaObject(content);
    }

    setFileHash = (e) => {
        let file = e.target.files[0];
        let fr = new FileReader();

        fr.onload = (event) => {
            let binary = event.target.result;
            let hash = sha256(binary);
            console.log(hash);
            this.setState({
                fileHash: hash,
            });
        };

        fr.readAsArrayBuffer(file);

        this.setState({
            fileName: file.name
        });
    }

    hashContent = () => {
        let content = this.state.inputContent;

        if (this.state.fileUpload && this.state.fileHash) {
          content = content.replace(/"contentHash":"[a-zA-Z0-9]+"/g, '"contentHash":"' + this.state.fileHash +'"');
          this.setState({inputContent: content});
        }

        let hash = sha256(content);
        if (hash === this.state.inputHash) {
            this.setState({
                valid: true,
                generatedHash: hash
            })
        } else {
            this.setState({
                valid: false,
                generatedHash: hash
            })
        }
    }

    checkForMediaObject = (content) => {
        const start = content.substr(0, 34);

        if (start.includes('MediaObjectTimestamp')) {
            if (content.includes('contentHash')) {
                this.setState({
                    fileUpload: true,
                })
            }
        }
    }

    render() {
        return (
            <div className="checker">
                <Field>
                    <Label>Blockchain Hash</Label>
                    <Control>
                        <Input onChange={this.setHash} type="text" value={this.state.inputHash}
                               placeholder='e.g. a93963adb1734e799f47ab87a9b4de784dd3c276f07bfcc9234acb1d82080100'/>
                        <Help>The hash retrieved from the blockchain</Help>
                    </Control>
                </Field>

                <Field>
                    <Label>Raw Content</Label>
                    <Control>
                        <TextArea onChange={this.setContent} value={this.state.inputContent} rows={10}
                                  placeholder={'{"type":"WebArticleTimestamp","version":0.1,"title":"","content":"Lorem Ipsum","date":"2019-07-11T19:33:49+00:00"}'}/>
                        <Help>A JSON-object containing the title, content and date</Help>
                    </Control>
                </Field>

                {(this.state.fileUpload === true) ?
                    <div className={'fileupload'}>
                        <Label>File</Label>
                        <div className="file has-name is-fullwidth is-block">
                            <label className="file-label">
                                <input className="file-input" type="file" name="file" onChange={this.setFileHash}/>
                                <span className="file-cta">
                                  <span className="file-label">
                                    Choose a file…
                                  </span>
                                </span>
                                <span className="file-name">{this.state.fileName}</span>
                            </label>
                            <Help className={'mb-4'}>You are checking an MediaObjectTimestamp, containing the hash of
                                the original file. To check if this hash is correct, select the original file that was
                                timestamped. We do not save or upload this file, everything is done locally on your
                                computer.</Help>
                        </div>
                    </div> : ''
                }

                <Button isColor="primary" onClick={this.hashContent}>Generate Hash</Button>

                <div className="result">
                    {(this.state.valid === true) || (this.state.valid === false) ?
                        <Field>
                            <Label>Generated Hash</Label>
                            <Control>
                                <Input readOnly value={this.state.generatedHash}/>
                            </Control>
                        </Field> : ''
                    }

                    {(this.state.valid === true) ?
                        <Notification isColor="success">The hash you put in and the generated hash are
                            identical.</Notification> : ''
                    }

                    {(this.state.valid === false) ?
                        <Notification isColor="warning">The hash you put in and the generated hash are not the same. The
                            content you
                            are reading may be outdated or tampered with.</Notification> : ''
                    }
                </div>
            </div>
        );
    }
}

export default Checker;
