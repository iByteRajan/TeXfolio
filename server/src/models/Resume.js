const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
    {
        institution: {
            type: String,
            default: ""
        },

        degree: {
            type: String,
            default: ""
        },

        field: {
            type: String,
            default: ""
        },

        startDate: {
            type: String,
            default: ""
        },

        endDate: {
            type: String,
            default: ""
        },

        cgpa: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        }
    },
    { _id: true }
);

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        startDate: {
            type: String,
            default: ""
        },

        endDate: {
            type: String,
            default: ""
        },

        bullets: {
            type: [String],
            default: []
        }
    },
    { _id: true }
);

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        technologies: {
            type: [String],
            default: []
        },

        bullets: {
            type: [String],
            default: []
        },

        github: {
            type: String,
            default: ""
        },

        liveUrl: {
            type: String,
            default: ""
        }
    },
    { _id: true }
);

const skillSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            default: ""
        },

        items: {
            type: [String],
            default: []
        }
    },
    { _id: true }
);

const achievementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        }
    },
    { _id: true }
);

const certificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },

        issuer: {
            type: String,
            default: ""
        },

        date: {
            type: String,
            default: ""
        },

        url: {
            type: String,
            default: ""
        }
    },
    { _id: true }
);


const codingProfileSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            default: ""
        },

        username: {
            type: String,
            default: ""
        },

        url: {
            type: String,
            default: ""
        },

        rating: {
            type: Number,
            default: null
        },

        maxRating: {
            type: Number,
            default: null
        },

        problemsSolved: {
            type: Number,
            default: null
        },

        contestsParticipated: {
            type: Number,
            default: null
        }
    },
    { _id: true }
);

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        personal: {
            name: {
                type: String,
                default: ""
            },

            email: {
                type: String,
                default: ""
            },

            phone: {
                type: String,
                default: ""
            },

            location: {
                type: String,
                default: ""
            },

            linkedin: {
                type: String,
                default: ""
            },

            github: {
                type: String,
                default: ""
            },

            portfolio: {
                type: String,
                default: ""
            }
        },

        education: {
            type: [educationSchema],
            default: []
        },

        experience: {
            type: [experienceSchema],
            default: []
        },

        projects: {
            type: [projectSchema],
            default: []
        },

        skills: {
            type: [skillSchema],
            default: []
        },

        achievements: {
            type: [achievementSchema],
            default: []
        },

        certifications: {
            type: [certificationSchema],
            default: []
        }, 
        codingProfiles: {
            type: [codingProfileSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resume", resumeSchema);