import React, { Component } from 'react';
import _ from 'lodash';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Modal } from './common';
import { employeeUpdate, employeeSave } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;

        console.log(`name ${name} phone ${phone} shift ${shift}`);

        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onFirePress() {
        return (
            <View>
                <
            </View>
        );
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
              </CardSection>

              <CardSection>
                <Button onPress={this.onTextPress.bind(this)}>
                    Text Schedule
                </Button>
              </CardSection>

              <CardSection>
              <Button onPress={this.onFirePress.bind(this)}>
                  Fire
              </Button>
            </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeSave })(EmployeeEdit);
