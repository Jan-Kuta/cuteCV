import React, { Component } from 'reactn';
import PropTypes from 'prop-types';;

class SocialLoginButton extends Component {
    constructor(props) {
        super(props);

        this.checkPopup = this.checkPopup.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.startAuth = this.startAuth.bind(this);

        this.state = { disabled: false };
        this.setGlobal({ user: null });

    }
    componentDidMount() {
        const {
            socket,
            provider,
            onSuccess
        } = this.props

        socket.on(provider, user => {
            const { popup } = this;

            console.log(popup);
            console.log('user', user)
            popup && popup.close();
            this.setGlobal({
                user
            });
            onSuccess();
        })
    }

    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({
                    disabled: ''
                })
            }
        }, 1000)
    }

    openPopup() {
        const {
            provider,
            socket,
            apiUrl
        } = this.props
        const width = 600,
            height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${apiUrl}/${provider}?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = () => {
        if (!this.state.disabled) {
            this.popup = this.openPopup()
            console.log(this.popup);
            this.checkPopup()
            this.setState({
                disabled: 'disabled'
            })
        }
    }

    render() {
        const { disabled } = this.state;
        const {
            className,
            children
        } = this.props;

        return ( 
            <a
                className = {`w3-button w3-round w3-section${disabled ? ' w3-disabled' : ''}${className ? ' ' + className : ''}`}
                onClick = {this.startAuth}
            >
                {children}
            </a>
        );
    }
}

SocialLoginButton.propTypes = {
    provider: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    apiUrl: PropTypes.string.isRequired,
    onSuccess: PropTypes.func
}

export default SocialLoginButton;