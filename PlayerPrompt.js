import inquirer from 'inquirer';

async function playerDirectionPrompt() {
  const result = await inquirer.prompt({
    type: 'list',
    name: 'direction',
    message: 'Which direction do you want to go next?',
    choices: ['Up', 'Down', 'Left', 'Right', '☹️Quit'],
  });
  return result.direction;
}

export { playerDirectionPrompt };
