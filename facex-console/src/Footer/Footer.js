import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer class="fixed-bottom" id="footer">
              <p>Team Edgewalk &copy; 2019</p>
            </footer>

        );
    }
}
export default Footer;
// const Footer = (props) => (
//     <footer>{props.title}</footer>
// );

// export default Footer;
// const Header = ({title}) => (<header>{title}</header>);
// const Main = ({title}) => (<main>{title}</main>);
// const Footer = ({title}) => (<footer>{title}</footer>);

// class Footer extends React.Component {
//   render() {
//     const {header,main,footer} = this.props;
//     return (
//       <div className="app">
//         <Header title={header} />
//         <Main title={main} />
//         <Footer title={footer}/>
//       </div>
//     );
//   }
// };
//
// ReactDOM.render(
//   <App
//     header="I am the header"
//     main="I am the main"
    // footer="I am the footer" />,
  // document.getElementById('react')
// );
