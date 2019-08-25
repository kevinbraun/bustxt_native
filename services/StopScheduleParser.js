import _ from 'lodash';

export class StopScheduleParser {
  constructor(data) {
    if(typeof data === 'object') {
      this.scheduleData = data['stop-schedule'];
      this.stopInfo = {};
      this.results = [];

      this.parseStopInfo();
      this.parseSchedules();
    } else {
      this.error = data;
    }
  }

  stop() {
    return this.stopInfo;
  }

  schedule() {
    return this.results;
  }

  errorMessage() {
    return this.error;
  }

  parseStopInfo() {
    this.stopInfo = this.scheduleData.stop;
  }

  parseSchedules() {
    let unorderedSS = [];
    let routeSchedules = this.scheduleData['route-schedules'];

    _.each(routeSchedules, (rs) => {
      let route = rs.route;
      let newData = _.map(rs['scheduled-stops'], (ss) => {
        return {
          route: route,
          key: ss.key,
          cancelled: ss.cancelled,
          estimated: ss.times.arrival.estimated,
          scheduled: ss.times.arrival.scheduled,
          variant: ss.variant,
          bus: ss.bus,
        }
      });

      unorderedSS = unorderedSS.concat(newData);
    });

    this.results = _.orderBy(unorderedSS, ['estimated']);
  }
}

export default StopScheduleParser;