import React from "react";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: [
        {
          id: "Javascript_skill",
          content: "Javascript",
          percentage: "85%",
          value: "85",
        },
        {
          id: "Python_skill",
          content: "Python",
          percentage: "80%",
          value: "80",
        },
        {
          id: "React_skill",
          content: "React",
          percentage: "80%",
          value: "80",
        },
        {
          id: "Solidity_skill",
          content: "Solidity",
          percentage: "70%",
          value: "70",
        },
        {
          id: "CSS_skill",
          content: "CSS",
          percentage: "80%",
          value: "80",
        },
      ],
      about_me: [
        {
          id: "first-p-about",
          content:
            "Hi there 👋. I am an autodidact (self-taught) who is intrinsically motivated to solve difficult and complex problems in the field of software development.",
        },
        {
          id: "second-p-about",
          content:
            "I have built complex models, data pipelines, interactive dashboards and graphs for data modelling and visualization using Python. Recently, I have begun worked extensively in front-end development with ReactJS. I am now hoping to embark on a new journey into the world of full-stack development.",
        },
        {
          id: "third-p-about",
          content:
            "Some things I enjoy include writing, reading philosophy, anime, and self-development. My personality type is INTJ. I am fluent in Russian and English.",
        },
      ],
    };
  }

  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-5"
                        style={{ margin: "0 auto" }}
                      >
                        <div
                          className="about-img"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            className="img-fluid rounded b-shadow-a"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="skill-mf">
                      {/* <p className="title-s">Skill</p> */}
                      {this.state.skills.map((skill) => {
                        return (
                          <React.Fragment key={skill.id}>
                            <span>{skill.content}</span>{" "}
                            <span className="pull-right">
                              {skill.percentage}
                            </span>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: skill.percentage }}
                                aria-valuenow={skill.value}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-me pt-4 pt-md-0">
                      <div className="title-box-2">
                        <h5 className="title-left">About Me</h5>
                      </div>
                      {this.state.about_me.map((content) => {
                        return (
                          <p className="lead" key={content.id}>
                            {content.content}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
