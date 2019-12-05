import React, { Component } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import './Filter.css';
import { Row } from 'reactstrap';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasExtraValue: false,
      options: [
          {label: 'Front Door', value: 'Front Door'},
          {label: 'Back Door', value: 'Back Door'},
      ],
      selectedOption: '',
      filterText: null,

    };
    this.filterOption = this.filterOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  filterOption = (option, inputValue) => {
      // console.log('option')
      // console.log(option)
      // console.log('inputValue')
      // console.log(inputValue)
      if (option.label === "None") {
        const { options } = this.state;
        const result = options.filter(opt => opt.label.includes(inputValue));
        this.setState({ hasExtraValue: !result.length });
        return !result.length;
      }
      return option.label.includes(inputValue);
  }

  basicFilterUpdate() {
    const val = this.myValue.value;
    console.log(`basicFilterUpdate`, val);
    this.props.filterUpdate(val);
  }

  filterUpdate(query) {
      // const val = this.myValue.value;
      // console.log('selectedOption');
      console.log(`filterUpdate reached `);

      // const val = this.myValue.value;
      console.log(`filterUpdate query:`, query);

      // console.log(`filterjs val`, this.state.selectedOption);
      this.props.filterUpdate(query);
  }

  handleChange = (selectedOption, value) => {
    this.setState(
      { selectedOption },
      () => console.log(`Filterjs Option selected:`, this.state.selectedOption)
    );

    // const val = this.myValue.value;
    console.log(`Filterjs, handleChange val:`, value);
    if (value.action == 'remove-value') {
        // this.setState({filterText: ''});
        console.log('undefined');
        this.filterUpdate('');

    } else if (value.action == 'select-option') {
        // this.setState({filterText: value.option.label});
        this.filterUpdate(value.option.label);
    }

  };

  componentDidMount() {
      var options = []
      var labels = []
      // var options = [{label: "Search By Location"}, {label: "front"}, {label: "back"}]
      options.map(opt => {labels.push(opt.label)});
      if (this.props.isFiltering === true) {
          console.log('yessir');
      } else {
          console.log('no sir');
      }

/*
    console.log(o.label)
    console.log(opt.location)*/
      // options.filter(o => o.label == "back") ? console.log('true') : console.log('false')

      // this.props.options.map(opt => {
      //     // console.log(opt.location)
      //     (options.filter(o => {
      //         if (o.label != opt.location)
      //           options.push({label: o.label});
      //     }))
      //
      // })
      this.props.options.map(opt => {
          if (!labels.includes(opt.location))
            options.push({label: opt.location, value: opt.location});
            labels.push(opt.location)

      })
      // console.log(options);
      options.map(opt => {
          this.setState({options: options});
      })
  }

  render() {
      // console.log('inside render()');
      // console.log(this.state.options);
    const { selectedOption } = this.state;
    const style = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      height: "35px",
      // match with the menu
      // border: "none"
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        // borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
      hyphens: "auto",
      // kill the gap
      marginTop: 0,
      textAlign: "left",
      // prevent menu to scroll y
      wordWrap: "break-word"
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
      }),

      control: (_, { selectProps: { width }}) => ({
        width: width
      }),

      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
      }
    }

    return (
            <div className="filter">
                {
                <Select
                  styles={style}
                  isMulti
                  placeholder={"Search By Location"}
                  filterOption={this.filterOption}
                  onChange={this.handleChange.bind(this)}
                  noOptionsMessage={() => "No more options"}
                  options={this.state.options}
                />

                }

                {this.state.hasExtraValue && (
                  <p>!</p>
                )}
            </div>
    );
  }
}

export default Filter;
