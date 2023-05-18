const dateComparer = (from: Date, to: Date) => {
    let date1 = new Date(from);
    let date2 = new Date(to);

    if(date1.getFullYear() > date2.getFullYear()) {
        return 1;
    } else if(date1.getFullYear() < date2.getFullYear()) {
        return 2;
    }


    if(date1.getMonth() > date2.getMonth()) {
        return 1;
    } else if(date1.getMonth() < date2.getMonth()) {
        return 2;
    }

    if(date1.getDate() > date2.getDate()) {
        return 1;
    } else if(date1.getDate() < date2.getDate()) {
        return 2;
    }

    return 0;
}

export default dateComparer;