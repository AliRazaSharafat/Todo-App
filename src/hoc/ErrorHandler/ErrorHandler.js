import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        clearError = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <div>
                    <p>{this.state.error ? this.state.error.message : null}</p>
                    {this.state.error ? <Button style={{ backgroundColor: 'grey', color:'white'}} onClick={this.clearError}>Clear Error</Button> : null}
                    <WrappedComponent {...this.props} />
                </div>
            )
        }

    }
}

export default ErrorHandler;