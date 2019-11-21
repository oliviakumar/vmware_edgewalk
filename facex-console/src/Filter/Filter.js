import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import './Filter.css';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasExtraValue: false,
      options: [
          {label: '', value: ''}
      ]
      //     [
      //     // { label: "Label 1", value: 1 },
      //     // { label: "Label 2", value: 2 },
      //     // { label: "Label 3", value: 3 },
      //     // { label: "Label 4", value: 4 },
      //     // { label: "Label 5", value: 5 },
      //     // { label: "Label 6", value: 6 },
      //     // { label: "Label 7", value: 7 },
      //     // { label: "Label 8", value: 8 },
          // [label: "Search By Location", value: "other"]
      // ]
  // }
    };
    this.filterOption = this.filterOption.bind(this);
  }

  filterOption = (option, inputValue) => {
    // if (option === "Search By Location") {
    //   const { options } = this.state;
    //   const result = options.filter(opt => {
    //       console.log('opt');
    //       console.log(opt);
    //   });
    //   this.setState({ hasExtraValue: !result.length });
    //   return !result.length;
    // }


    // console.log('FO this.state.options');
    // console.log(this.state.options);
    return this.state.options.values();
    // console.log('filter option');
    // console.log(option);
    // console.log(inputValue);

  };

  componentDidMount() {
      // var options = [{label: "Search By Location"}]
      var options = [{label: "Search By Location"}, {label: "front"}, {label: "back"}]
      console.log('hi')
      options.map(opt => {console.log(opt.label)});
      console.log('bye')

      options.filter(o => o.label == "back") ? console.log('true') : console.log('false')
      
      // this.props.options.map(opt => {
      //     console.log(opt.location)
      //     if (!options.values().includes(opt.location))
      //       options.push({label: opt.location});
      // })
      console.log("cdm options");
      console.log(options);
      console.log('yuh')


      options.map(opt => {
          // this.setState({options: [{label: opt, value: opt}]});
      })
  }

  render() {
      console.log('inside render()');
      console.log(this.state.options);

    return (
      <div className="filter">
{
        <Select
          isMulti
          filterOption={this.filterOption}
          noOptionsMessage={() => "No more options"}
          options={this.state.options}
        />
    }
        {this.state.hasExtraValue && (
          <p>Please select 'Ostatni' option if you don't find your option !</p>
        )}
      </div>
    );
  }
}

export default Filter;
