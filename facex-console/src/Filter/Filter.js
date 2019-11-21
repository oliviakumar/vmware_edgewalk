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
      console.log(option)
      console.log(inputValue)
      if (option.label === "None") {
        const { options } = this.state;
        const result = options.filter(opt => opt.label.includes(inputValue));
        this.setState({ hasExtraValue: !result.length });
        return !result.length;
      }

      return option.label.includes(inputValue);
  }

  // temp() {
  //   console.log('FO this.state.options');
  //   console.log(this.state.options.label);
  //   this.state.options.map(o => {
  //       console.log(o.label)
  //   });
  //   return null;
  //   // console.log('filter option');
  //   // console.log(option);
  //   // console.log(inputValue);
  //
  // };

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
      console.log('inside render()');
      console.log(this.state.options);

    return (
      <div className="filter">
{
        <Select
          isMulti
          placeholder={"Search By Location"}
          filterOption={this.filterOption}
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
