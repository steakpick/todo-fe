import axios from 'axios';

const GET_TASKS_REST_API_URL = 'http://localhost:8090/justtasks/';

class TasksService {

    getTasks(datetime, datetype) {
        return axios.get(GET_TASKS_REST_API_URL, {
            params: {
                datetime: datetime,
                datetype: datetype
            }
        });
    }

}

export default new TasksService();