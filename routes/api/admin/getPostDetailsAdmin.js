const db = require('../../../db');

module.exports = async (req,res) => {
    try{
        const { postId } = req.params;
        console.log('postId: ', postId);
        let output = {
            code: 422,
            errors: [],
            message: "Invalid GET Request"
        }
        if(!postId){
            output.errors.push('postId missing');
        }
        const [postDetails] = await db.execute(`
        SELECT postTitle, postContent, postQuote, id
        FROM posts
        WHERE pid=?`,
        [postId]);
        if(!postDetails){
            output.code = 404;
            output.errors.push('Specified post not found');
        } 
        if (output.errors.length) {
            res.status(output.code).send(output);
            return;
        }
        res.send(postDetails);
    }catch(error){
        console.log("error: ", error);
        res.status(500).send("Server error");
    }
}