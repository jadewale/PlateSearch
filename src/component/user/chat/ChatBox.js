import React from 'react';

const ChatBox = () => (
    <div className="box box-warning direct-chat direct-chat-warning">
        <div className="box-header with-border">
            <h3 className="box-title">Direct Chat</h3>

            <div className="box-tools pull-right">
                <span data-toggle="tooltip" title="" className="badge bg-yellow" data-original-title="3 New Messages">3</span>
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="" data-widget="chat-pane-toggle" data-original-title="Contacts">
                    <i className="fa fa-comments"></i></button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i>
                </button>
            </div>
        </div>
        <div className="box-body">
            <div className="direct-chat-messages">
                <div className="direct-chat-msg">
                    <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-left">Alexander Pierce</span>
                        <span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image"/>
                        <div className="direct-chat-text">
                            Is this template really for free? That's unbelievable!
                        </div>
                </div>
                <div className="direct-chat-msg right">
                    <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-right">Sarah Bullock</span>
                        <span className="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image"/>
                        <div className="direct-chat-text">
                            You better believe it!
                        </div>
                </div>
              <div className="direct-chat-msg">
                    <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-left">Alexander Pierce</span>
                        <span className="direct-chat-timestamp pull-right">23 Jan 5:37 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image"/>
                        <div className="direct-chat-text">
                            Working with AdminLTE on a great new app! Wanna join?
                        </div>
                </div>
              <div className="direct-chat-msg right">
                    <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-right">Sarah Bullock</span>
                        <span className="direct-chat-timestamp pull-left">23 Jan 6:10 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image"/>
                        <div className="direct-chat-text">
                            I would love to.
                        </div>
               </div>
           </div>
        </div>
    </div>
);

export default ChatBox;

