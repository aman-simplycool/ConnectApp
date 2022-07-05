const getData = async () => {
    try {
        const res = await fetch("/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.json()
    } catch (error) {
        console.log(error);
        alert("some err occured")
    }

}
export default getData




