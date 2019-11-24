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
          {label: '', value: ''}
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

      const val = this.myValue.value;
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

    return (
        <div>
            <Row>
                <svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" aria-hidden="true"><g id="Page-1" stroke="none" fill="none" ><g id="Artboard-1" stroke="#777777" ><g id="Group"><path d="M13.4044,7.0274 C13.4044,10.5494 10.5494,13.4044 7.0274,13.4044 C3.5054,13.4044 0.6504,10.5494 0.6504,7.0274 C0.6504,3.5054 3.5054,0.6504 7.0274,0.6504 C10.5494,0.6504 13.4044,3.5054 13.4044,7.0274 Z" id="Stroke-3"></path><path d="M11.4913,11.4913 L17.8683,17.8683" id="Stroke-7"></path></g></g></g></svg>
                <input type="text"
                    ref={ (value) => {this.myValue = value} }
                    placeholder="filter by location..."
                    onChange={this.basicFilterUpdate.bind(this)}/>
            </Row>
            <div className="filter">
                {
                <Select
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
        </div>
    );
  }
}

export default Filter;
