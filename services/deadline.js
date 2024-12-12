import cron from "node-cron"
import { sendDeadlineMail } from "../utils/emailSender.js"
import Deadline from "../models/Deadline.js"
import { Op } from "sequelize"

export let startDeadlineCron = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            let now = new Date()
            let deadlines = await Deadline.findAll({
                where: {
                    deadline: { [Op.lte]: now },
                    notified: false
                },
            })
            if (deadlines) {
                if (Array.isArray(deadlines)) {
                    for (let deadline of deadlines) {
                        console.log(deadline.investigators_email)
                        if (Array.isArray(deadline.investigators_email) ){
                            for (let email of deadline.investigators_email) {
                                try {
                                    await sendDeadlineMail(email, deadline.projectId, deadline.description)
                                    try {

                                        await Deadline.update({
                                            notified: true
                                        }, {
                                            where: { id: deadline.id }
                                        })
                                    } catch (errorD) {
                                        console.error("error updating deadline")
                                    }
                                } catch (error) {
                                    console.error("error sending email")
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log("error catching deadlines")
            console.error(error)
        }
    })
}